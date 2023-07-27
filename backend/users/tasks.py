from tiny_bird_36835.celery import app
from django.core.management import call_command


@app.task(bind=True)
def databaseBackupDaily(self):
    call_command("dbbackup")