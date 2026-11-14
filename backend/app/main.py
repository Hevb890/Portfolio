from contextlib import asynccontextmanager
import networkx as nx
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.graph import get_graph_service, router as graph_router
from app.services.graph_service import GraphService

def build_seed_graph() -> nx.DiGraph:
    g = nx.DiGraph()
    nodes = [
        ("gateway", {"label": "API Gateway", "category": "ingress"}),
        ("auth", {"label": "Auth Service", "category": "service"}),
        ("orders", {"label": "Orders Service", "category": "service"}),
        ("inventory", {"label": "Inventory Service", "category": "service"}),
        ("postgres", {"label": "Primary DB", "category": "database"}),
        ("redis", {"label": "Session Cache", "category": "cache"}),
        ("kafka", {"label": "Event Bus", "category": "broker"}),
    ]
    edges = [
        ("gateway", "auth", {"id": "e1", "relation": "authenticates", "weight": 1.0}),
        ("gateway", "orders", {"id": "e2", "relation": "routes_to", "weight": 1.0}),
        ("auth", "redis", {"id": "e3", "relation": "reads_session", "weight": 0.5}),
        ("orders", "inventory", {"id": "e4", "relation": "reserves", "weight": 2.0}),
        ("orders", "postgres", {"id": "e5", "relation": "writes", "weight": 1.5}),
        ("orders", "kafka", {"id": "e6", "relation": "publishes", "weight": 1.0}),
        ("inventory", "postgres", {"id": "e7", "relation": "queries", "weight": 1.5}),
    ]
    g.add_nodes_from(nodes)
    g.add_edges_from(edges)
    return g

@asynccontextmanager
async def lifespan(app: FastAPI):
    service = GraphService(build_seed_graph())
    app.dependency_overrides[get_graph_service] = lambda: service
    yield
    app.dependency_overrides.clear()

app = FastAPI(title="Graph Traversal API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(graph_router)