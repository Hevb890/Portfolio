from enum import Enum
from pydantic import BaseModel, Field
from typing import Any

class TraversalDirection(str, Enum):
    OUTBOUND = "OUTBOUND"
    INBOUND = "INBOUND"
    BOTH = "BOTH"

class GraphNodeDTO(BaseModel):
    id: str
    label: str
    category: str = "default"
    metadata: dict[str, Any] = Field(default_factory=dict)
    has_unexpanded_neighbors: bool = False

class GraphEdgeDTO(BaseModel):
    id: str
    source: str
    target: str
    relationship: str

class SubgraphResponse(BaseModel):
    root_id: str
    nodes: list[GraphNodeDTO]
    edges: list[GraphEdgeDTO]
    truncated: bool = False

class PathResponse(BaseModel):
    source_id: str
    target_id: str
    node_ids: list[str]
    edge_ids: list[str]
