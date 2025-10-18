from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),   # Admin panel URLs
    path('', include('core.urls')),    # Include all URLs from the core app at root
    
]
