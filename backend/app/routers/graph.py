from fastapi import APIRouter, Depends, HTTPException, Query, status
from app.schemas import PathResponse, SubgraphResponse, TraversalDirection
from app.services.graph_service import (
    GraphService,
    NodeNotFoundError,
    PathNotFoundError
)

router = APIRouter(prefix = "/api/v1/graph", tags = ["Graph"])

def get_graph_service() -> GraphService:
    raise NotImplementedError


@router.get("/traverse/{node_id}", response_model=SubgraphResponse)
async def traverse_from_node(
    node_id: str,
    depth: int = Query(default=1, ge=1, le=4),
    direction: TraversalDirection = Query(default=TraversalDirection.BOTH),
    max_nodes: int = Query(default=75, ge=1, le=250),
    service: GraphService = Depends(get_graph_service)
) -> SubgraphResponse:
    try:
        return service.traverse_neighborhood(
            start_id=node_id,
            depth=depth,
            direction=direction,
            max_nodes=max_nodes
        )
    except NodeNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        ) from e

