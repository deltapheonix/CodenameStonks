from django.urls import path

from . import views

urlpatterns = [
    path('GetCryptoPrice/<coin>', views.getCryptoPrice, name='getCryptoPrice'),
    path('GetStockPriceHistory/<stock>/<interval>', views.getStockPriceHistory, name='getStockPriceHistory')
]