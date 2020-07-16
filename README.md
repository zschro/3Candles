# 3 Candles
This is a simple strategy that just looks at the previous candle color.

If there are 3 green candles in a row it will signal a buy.

If there are 3 red candles in a row it will signal a sell.

There is a trailing stop loss that will signal a sell if the price goes more than 5% lower than the highest price held.

# Install
copy the file(s) from /strategies/ into the strategies folder of your gekko install
copy the file(s) from /toml/ into the /config/strategies/ folder of your gekko install

# Usage / Configuration
```javascript
  stoploss_threshold: 5,  // the percentage below the highest held price to trigger the stop loss
  number_of_candles: 3    // the number of candles to look for before triggering a buy or sell
```
