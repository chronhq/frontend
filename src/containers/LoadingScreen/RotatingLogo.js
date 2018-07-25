import React, { Component } from 'react';

import './RotatingLogo.less';

const ringBorder = 'M105.1,206.1c-42.2-0.3-80.7-26.8-95-66.7S8.3,53.7,40.9,26.7c32.5-26.9,79.7-30.6,116-8.9 c36.5,21.8,55.7,65.4,47.3,107.1C194.7,171.6,152.8,205.8,105.1,206.1c-1-0.1-1.9,0.7-2,1.8c-0.1,1,0.7,2,1.8,2c0.1,0,0.2,0,0.3,0 c44-0.3,84.2-27.9,99.1-69.5s1.4-89.4-32.9-117.1s-83.6-31-121.2-8C12.8,38.1-6.7,82.9,2.1,125.8c9.8,48.6,53.8,83.7,103.1,84 c1,0.1,2-0.6,2.1-1.7c0.1-1-0.6-2-1.7-2.1C105.5,206,105.3,206,105.1,206.1z';
const ringCenter = 'M122.3,104.8c0-9.5-7.7-17.2-17.2-17.2s-17.2,7.7-17.2,17.2s7.7,17.2,17.2,17.2l0,0 C114.6,122,122.3,114.4,122.3,104.8C122.3,104.9,122.3,104.9,122.3,104.8z';

const ring1Arc = 'M120,170.1c-25.2,5.2-51.3-3.7-67.3-24.1c-16.8-21.5-18.6-51.4-5.2-75c1.3-2.3-2.5-3.5-3.7-1.5 c-14,24.8-12.4,56.1,5.3,78.7c16.7,21.4,44.4,31,70.9,25.6C122.5,173.3,122.7,169.6,120,170.1L120,170.1z';
const ring1Arc2 = 'M67.2,50.1c22.8-15.5,53.4-16.4,76.5-1c22.4,15,33,42.8,27.3,69c-3.3,14.9-11.5,28.3-23.3,38.1 c-1,0.8,1.7,4.1,2.6,3.4c22.7-19.1,31-50.3,20.8-78.2c-8.8-23.8-30.3-42.1-55.5-46.2c-17.8-2.8-36,1.3-50.8,11.5 C63.6,47.4,66.1,50.8,67.2,50.1L67.2,50.1z';
const ring1Arc3 = 'M105.8,137.8c-16.7,0.4-30.9-11.1-32.9-27.9C71.2,95.7,78.5,82,91.3,75.4c14.2-7.2,32.2-3.2,41.1,10.3 s6.2,31.4-5.1,42.7c-0.8,0.8,2.5,3.4,3.5,2.3c21.1-21.1,7.7-56.7-21-61.3c-28.5-4.6-50.3,26.4-36.3,51.7 c7,12.6,20.6,19.8,34.9,19.4C109.9,140.6,107,137.7,105.8,137.8L105.8,137.8z';

const ring2Arc = 'M193.1,105.2C192.7,70.3,171.9,39,140,25.1c-1.8-0.8-4.3,0.4-1.7,1.6c31,13.6,50.4,44.2,50.8,77.8 C189.1,105.8,193.2,106.8,193.1,105.2z';
const ring2Arc2 = 'M77.2,187.2c45.7,15,95.8-8.7,111.5-54.5c0.5-1.4-3.6-2.6-4-1.2c-15,43.7-62.7,68.2-106.8,53.7 C75.4,184.4,74.9,186.4,77.2,187.2L77.2,187.2z';
const ring2Arc3 = 'M17.4,104.6c0.3,31.2,16.8,60,43.5,76c2.4,1.4,3.5-2.1,1.5-3.3c-25.5-15.2-41.2-42.6-41.4-72.3C21,102.8,17.4,101.8,17.4,104.6L17.4,104.6z';
const ring2Arc4 = 'M97,17.2c-30.8,3-57.8,21.9-71.3,49.8c-0.9,1.9,2.1,4.7,3.2,2.4C42,42.3,68.3,24,98.2,21.2 C100.5,21,99.1,17,97,17.2L97,17.2z';
const ring2Arc5 = 'M75.6,149.2c19.7,12.6,45.8,12,64-3.2c17.7-14.8,23.4-39,15.4-60.5c-0.8-2.2-4.5-1.6-3.5,1 c9.9,25.7-2.9,54.7-28.6,64.6c-14.9,5.7-31.6,4-45-4.6C75.6,145.1,73.4,147.8,75.6,149.2L75.6,149.2z';
const ring2Arc6 = 'M132.7,59.2c-19.2-11.3-44-10.2-61.4,4.1C54.6,77,47.8,99.3,53.9,120c0.6,2.1,4.6,2.5,3.9-0.1 c-5.6-19.4,0.3-40.5,16.1-53.4c16.4-13.5,39.5-14.8,57.6-4C133.9,63.9,134.8,60.5,132.7,59.2L132.7,59.2z';

class RotatingLogo extends Component {
  render() {
    return (
      <svg
        style={{ zIndex: 3 }}
        width='220'
        height='220'
        viewBox="0 0 220 220"
        transform="scale(0.2)"
      >
        <g id="ringBody">
          <path className='stb0' d={ringBorder} />
          <path className='stb1' d={ringCenter} />
        </g>
        <g>
          <g>
            <path className='st0' d='M66.5,120.8' />
            <path className='st1' d={ring1Arc} />
            <path className='st1' d={ring1Arc2} />
            <path className='st2' d={ring1Arc3} />
            <circle className='st3' cx='136.6' cy='165.8' r='2.5' />
          </g>
          <g>
            <path className='st0' d='M66.5,120.8' />
            <path className='st4' d={ring2Arc} />
            <path className='st4' d={ring2Arc2} />
            <path className='st4' d={ring2Arc3} />
            <path className='st4' d={ring2Arc4} />
            <path className='st5' d={ring2Arc5} />
            <path className='st5' d={ring2Arc6} />

            <circle className='st3' cx='144.5' cy='72.7' r='2.5' />
            <circle className='st3' cx='22.2' cy='86' r='3' />
            <circle className='st3' cx='119.2' cy='20.4' r='2.5' />
          </g>
        </g>
      </svg>
    );
  }
}

export default RotatingLogo;
