from collections import deque
import networkx as nx
from app.schemas import (
    GraphEdgeDTO,
    GraphNodeDTO,
    PathResponse,
    SubgraphResponse,
    TraversalDirection
)

class NodeNotFoundError(Exception):
    """Custom exception raised when a node is not found in the graph."""
    pass

class PathNotFoundError(Exception):
    """Custom exception raised when a path is not found between two nodes."""
    pass

class GraphService:
    def __init__(self, graph: nx.Graph) -> None:
        self._graph = graph

    def _serialize_node(self, node_id: str, loaded_nodes: set[str]) -> GraphNodeDTO:
        attrs = self._graph.nodes[node_id]
        neighbors = set(self._graph.successors(node_id)) | set(
            self._graph.predecessors(node_id)
        )

        has_expanded = not neighbors.issubset(loaded_nodes)

        return GraphNodeDTO(
            id=node_id,
            label=attrs.get("label", node_id),
            category=attrs.get("category", "default"),
            metadata=attrs.get("metadata", {}),
            has_unexpanded_neighbors=has_expanded,
        )

    def traverse_neighborhood(
            self, 
            start_id: str,
            depth: int = 1,
            direction: TraversalDirection = TraversalDirection.BOTH,
            max_nodes: int = 100
    ):
        if start_id not in self._graph:
            raise NodeNotFoundError(f"Node with id '{start_id}' not found in the graph.")

        visited_nodes: set[str] = {start_id}
        queue: deque[tuple[str, int]] = deque([(start_id, 0)])
        truncated = False

        while queue:
            current_id, current_depth = queue.popleft()
            if current_depth >= depth:
                continue

            neighbors: list[str] = []

            if direction in (TraversalDirection.OUTBOUND, TraversalDirection.BOTH):
                neighbors.extend(self._graph.successors(current_id))
            if direction in (TraversalDirection.INBOUND, TraversalDirection.BOTH):
                neighbors.extend(self._graph.predecessors(current_id))


            for neighbor_id in neighbors:
                if neighbor_id not in visited_nodes:
                    if len(visited_nodes) >= max_nodes:
                        truncated = True
                        break
                visited_nodes.add(neighbor_id)
                queue.append((neighbor_id, current_depth + 1))

            if truncated:
                break

        induced = self._graph.subgraph(visited_nodes)
        edges = [
            GraphEdgeDTO(
                id = data.get("id", f"{u}-{v}"),
                source = u,
                target = v,
                relationship = data.get("relationship", "connected_to")
            )
            for u, v, data in induced.edges(data=True)
        ]

        nodes = [
            self._serialize_node(node_id, visited_nodes) for node_id in visited_nodes
        ]

        return SubgraphResponse(
            root_id=start_id,
            nodes=nodes,
            edges=edges,
            truncated=truncated
        )
