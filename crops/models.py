from django.db import models

# Create your models here.

class Crop(models.Model):
    name = models.CharField(max_length=50)
    binomial_name = models.CharField(max_length=50)
    description = models.TextField(max_length=600)
    is_perennial = models.BooleanField(default=False)
    image = models.CharField(max_length=300)
    growing_days  = models.PositiveIntegerField()
    sowing_method = models.TextField(max_length=400)
    companions = models.ManyToManyField(
        'crops.Crop',
        related_name="companions_plants"
    )
    tags = models.ManyToManyField(
        'crop_tags.CropTag',
        related_name="crops"
    )
    liked_by = models.ManyToManyField(
        'jwt_auth.User',
        related_name="liked_crop",
        blank=True
    )

    def __str__(self):
        return f"{self.name} - {self.binomial_name}"
