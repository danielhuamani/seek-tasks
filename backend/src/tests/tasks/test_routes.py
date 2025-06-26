import pytest
from fastapi.testclient import TestClient
from src.main import app
from src.auth.infrastructure.web.dependencies import get_current_user


@pytest.fixture(autouse=True, scope="module")
def override_auth():
    def fake_get_current_user():
        return {"sub": "testuser", "user_id": "testid"}
    app.dependency_overrides[get_current_user] = fake_get_current_user
    yield
    app.dependency_overrides = {}

def test_create_task(client: TestClient):
    response = client.post(
        "/tasks",
        json={"title": "Test Task", "description": "Test Description", "status": "todo"},
        headers={"Authorization": "Bearer fake-token"}
    )
    print("******", response.status_code)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Task"
    assert data["description"] == "Test Description"
    assert data["status"] == "todo"
    assert "id" in data

def test_get_all_tasks(client: TestClient):
    client.post(
        "/tasks",
        json={"title": "Another Task", "description": "Another Desc", "status": "todo"}
    )
    response = client.get("/tasks")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0

def test_get_task_by_id(client: TestClient):
    create_resp = client.post(
        "/tasks",
        json={"title": "Unique Task", "description": "Unique Desc", "status": "todo"}
    )
    task_id = create_resp.json()["id"]
    response = client.get(f"/tasks/{task_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == task_id

def test_update_task(client: TestClient):
    create_resp = client.post(
        "/tasks",
        json={"title": "To Update", "description": "Update me", "status": "todo"}
    )
    task_id = create_resp.json()["id"]
    update_resp = client.put(
        f"/tasks/{task_id}",
        json={"title": "Updated Title", "description": "Updated Desc", "status": "in_progress"}
    )
    assert update_resp.status_code == 200
    get_resp = client.get(f"/tasks/{task_id}")
    assert get_resp.json()["title"] == "Updated Title"

def test_delete_task(client: TestClient):
    create_resp = client.post(
        "/tasks",
        json={"title": "To Delete", "description": "Delete me", "status": "todo"}
    )
    task_id = create_resp.json()["id"]
    delete_resp = client.delete(f"/tasks/{task_id}")
    assert delete_resp.status_code == 200

def test_get_task_not_found(client: TestClient):
    response = client.get("/tasks/notfound")
    assert response.status_code == 404

def test_update_task_not_found(client: TestClient):
    response = client.put("/tasks/notfound", json={"title": "To Update", "description": "Update me", "status": "todo"})
    assert response.status_code == 404

def test_delete_task_not_found(client: TestClient):
    response = client.delete("/tasks/notfound")
    assert response.status_code == 404