import axios from 'axios';
import { getRssList } from './lib/rss';

async function main() {
  getRssList();
}

main();