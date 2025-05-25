from django.urls import path, include, re_path

from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

# Import for DRF-Spectacular
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),

    # API Endpoints
    path('api/', include('Account.urls')),
    path('api/', include('Group_Class.urls')),
    path('api/', include('Payment.urls')),

    # Schema and Swagger UI
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('e_wallet/', include('E_wallet.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)