
from django.contrib import admin
from django.urls import path, include
from django.conf import settings

from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('Account.urls')),
    path('api/', include('Group_Class.urls')),
    path('api/', include('Payment.urls')),
    path('e_wallet/', include('E_wallet.urls')),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
