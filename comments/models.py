from django.db import models

# Create your models here.

class Comment(models.Model):
    text = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    crop = models.ForeignKey(
        "crops.Crop",
        related_name="comments",
        on_delete=models.CASCADE
    )
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="posted_comments",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"Comment - {self.id} on Crop - {self.crop}"
