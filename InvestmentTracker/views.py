from django.shortcuts import render
from django.http import HttpResponse
import requests
import json

# insert key before testing
apikey = '<Insert Private Key>'

# Create your views here.
def getCryptoPrice(request, coin):

    data = {
        'apikey': f'{apikey}',
        'function': 'CURRENCY_EXCHANGE_RATE',
        'from_currency': f'{coin}',
        'to_currency': 'USD'
    }
    r = requests.get("https://www.alphavantage.co/query", params=data)
    json_data = r.json()
    json_pretty = json.dumps(json_data, sort_keys=True, indent=4)
    context = {
        "json_pretty": json_pretty,
    }
    return render(request, "CryptoOutput.html", context)

def getStockPriceHistory(request, stock, interval):


    data = {
        'apikey': f'{apikey}',
        'function': 'TIME_SERIES_INTRADAY',
        'symbol': f'{stock}',
        'interval': f'{interval}',
        'outputsize': 'full'
    }
    r = requests.get("https://www.alphavantage.co/query", params=data)
    json_data = r.json()
    json_pretty = json.dumps(json_data, sort_keys=True, indent=4)
    context = {
        "json_pretty": json_pretty,
    }
    return render(request, "CryptoOutput.html", context)

