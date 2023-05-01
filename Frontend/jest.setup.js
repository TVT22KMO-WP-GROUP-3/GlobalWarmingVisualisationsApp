import { _adapters } from 'chart.js';
import luxonAdapter from 'chartjs-adapter-luxon';

_adapters._date.override(luxonAdapter._date);


