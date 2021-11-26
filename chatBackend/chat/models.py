from django.db import models

# Create your models here.

class Message(models.Model): 
    #replace the author text field for a user 
    author = models.CharField(max_length=50)
    date = models.DateTimeField("date_time",auto_now=True)
    text = models.TextField(max_length=1000)

