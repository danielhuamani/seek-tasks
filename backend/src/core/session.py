from fastapi import Request, Depends

def get_db(request: Request):
    return request.app.database
