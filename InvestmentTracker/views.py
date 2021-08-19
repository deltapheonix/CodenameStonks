from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import requests
import json
import pandas as pd

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
    #return render(request, "CryptoOutput.html", context)
    return JsonResponse(json_data)

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

    # json_pretty = json.dumps(json_data, sort_keys=True, indent=4)
    # context = {$son_pretty,
    # }
    #return render(request, "CryptoOutput.html", context)
    timeseries  = json_data['Time Series (15min)']
    df = pd.DataFrame.from_dict(timeseries, orient='index')
    df["date"] = df.index
    df.reset_index(drop=True, inplace=True)
    result = df.to_dict(orient = 'index')
    
    response = JsonResponse(result)

    response["Access-Control-Allow-Origin"] = "*"

    return response