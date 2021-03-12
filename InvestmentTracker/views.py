from django.shortcuts import render
from django.http import HttpResponse
import requests, json

# Create your views here.
def getCryptoPrice(request, coin):

    data = {
        'apikey': 'D58JS20WFDJQS2GI',
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
