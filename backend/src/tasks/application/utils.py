
from datetime import datetime
from zoneinfo import ZoneInfo  # Python 3.9+

def format_datetime(dt):
    if not dt:
        return None
    lima_tz = ZoneInfo("America/Lima")
    if isinstance(dt, str):
        try:
            dt = datetime.fromisoformat(dt)
        except Exception:
            return dt
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=ZoneInfo("UTC"))
    dt_lima = dt.astimezone(lima_tz)
    return dt_lima.strftime('%d/%m/%Y %H:%M')
