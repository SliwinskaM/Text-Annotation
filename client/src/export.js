import axios from 'axios';

export function exportJSON(){
    axios.get('http://localhost:27017/collections').then(console.log('Wyeksportowano: '));
}