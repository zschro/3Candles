var log = require('../core/log.js');
var config = require ('../core/util.js').getConfig();

var strategy = {
  candleBuffer : [],
  bufferLength: 3,

  init : function(settings) {
    this.name = '3 Candles';
    this.bufferLength = this.settings.number_of_candles > 0 ? this.settings.number_of_candles : 3;
    this.requiredHistory = config.tradingAdvisor.historySize;
    this.addIndicator('zTrailingStop', 'zTrailingStop', this.settings.stoploss_threshold);
  },
  update : function(candle)
  {
    this.candleBuffer.push(this.getCandleColor(candle));
    if(this.candleBuffer.length > this.bufferLength)
      this.candleBuffer.shift();
  },
  
  onTrade: function(event) {
  },
  log:  function() {
  },

  getCandleColor: function(candle){
    return candle.close > candle.open ? 'green' : 'red';
  },

  check : function(candle) {

    if(this.indicators.zTrailingStop.shouldSell)
    {
      this.indicators.zTrailingStop.short(candle.close);
      return this.advice('short');
    }
    
    buySignal = this.candleBuffer.reduce((result, color) => color == 'green' && result, true);
    if(buySignal)
    {
      this.indicators.zTrailingStop.long(candle.close);
      return this.advice('long');
    }

    sellSignal = this.candleBuffer.reduce((result, color) => color == 'red' && result, true);
    if(sellSignal)
    {
      this.indicators.zTrailingStop.short(candle.close);
      return this.advice('short');
    }
  },

  end : function() {
    log.debug("Stoploss triggered: " + this.indicators.zTrailingStop.timesStopped + " times.")
  }
};

module.exports = strategy;
