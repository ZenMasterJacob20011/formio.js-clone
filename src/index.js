import Formio from './Formio.js';
import './formio.css';
import Components from './components/_classes/components/Components.js';
import Template from './templates/Template.js';
export {Components, Template};
Formio.Components = Components;
window.Formio = Formio;
