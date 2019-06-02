/*
 * Chron.
 * Copyright (c) 2018 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
 * Daniil Mordasov, Liam O’Flynn, Mikhail Orlov.
 * -----
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * -----
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * -----
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import React from 'react';

export const Play = ({ fill = '#fffffe' }) => (
  <svg width='32px' height='32px' viewBox='0 0 32 32'>
    <path
      style={{ fill: { fill }, strokeWidth: 0.26458332, fillOpacity: 1 }}
      d="M 8.1038213,24.687297 V 6.8732175 L 25.088548,15.779861 Z M 26.395139,14.634701 8.4949393,4.9411511 C 7.4329181,4.4611004 6.2167342,4.6754228 6.2167342,6.2365754 V 25.323939 c 0,1.550081 1.3046883,1.826092 2.2782051,1.294636 L 26.395139,16.925817 c 1.031567,-0.607379 1.00302,-1.73277 0,-2.291116 z"
      id="Fill-126"
    />
  </svg>
);

export const Next = ({ fill = '#fffffe' }) => (
  <svg width='32px' height='32px' viewBox='0 0 32 32'>
    <path
      style={{ fill: { fill }, strokeWidth: 0.26458332, fillOpacity: 1 }}
      d="M 14.645579,25.290309 V 18.184143 L 4.4837621,25.290309 V 6.3405331 L 14.645579,13.446699 V 6.3405331 L 28.193821,15.815423 Z M 29.366337,14.598067 14.996657,4.2865139 C 14.044092,3.7755446 12.952786,3.654572 12.951942,5.6223036 V 10.110184 L 4.8348401,4.2865139 C 3.882275,3.7755446 2.7639004,3.7603187 2.7901253,5.6756006 V 25.929016 c 0.027178,1.730014 1.1716716,1.980422 2.0447148,1.415312 l 8.1171019,-5.82367 v 4.434583 c 8.44e-4,1.677564 1.170824,1.954197 2.044715,1.389087 l 14.36968,-10.310706 c 0.602331,-0.433138 0.631942,-2.003264 0,-2.435555 z"
      id="Fill-126"
    />
  </svg>
);

export const Pause = ({ fill = '#fffffe' }) => (
  <svg width='32px' height='32px' viewBox='0 0 32 32'>
    <path
      style={{ fill: { fill }, strokeWidth: 0.26458332, fillOpacity: 1 }}
      d="m 13.280256,23.411857 c 0,0.392659 -0.317395,0.710055 -0.710057,0.710055 H 11.15009 c -0.392661,0 -0.710056,-0.317396 -0.710056,-0.710055 V 7.7906407 c 0,-0.3919505 0.317395,-0.7100544 0.710056,-0.7100544 h 1.420109 c 0.392662,0 0.710057,0.3181039 0.710057,0.7100544 z m 0,-17.751382 h -2.840222 c -0.7839005,0 -1.4201098,0.6362103 -1.4201098,1.4201113 V 24.121912 c 0,0.783901 0.6362093,1.420111 1.4201098,1.420111 h 2.840222 c 0.783901,0 1.420109,-0.63621 1.420109,-1.420111 V 7.0805863 c 0,-0.783901 -0.636208,-1.4201113 -1.420109,-1.4201113 z m 8.520663,17.751382 c 0,0.392659 -0.317395,0.710055 -0.710057,0.710055 h -1.420109 c -0.392661,0 -0.710057,-0.317396 -0.710057,-0.710055 V 7.7906407 c 0,-0.3919505 0.317396,-0.7100544 0.710057,-0.7100544 h 1.420109 c 0.392662,0 0.710057,0.3181039 0.710057,0.7100544 z m 0,-17.751382 h -2.840223 c -0.783901,0 -1.420108,0.6362103 -1.420108,1.4201113 V 24.121912 c 0,0.783901 0.636207,1.420111 1.420108,1.420111 h 2.840223 c 0.783901,0 1.420109,-0.63621 1.420109,-1.420111 V 7.0805863 c 0,-0.783901 -0.636208,-1.4201113 -1.420109,-1.4201113 z"
    />
  </svg>
);

export const Prev = ({ fill = '#fffffe' }) => (
  <svg width='32px' height='32px' viewBox='0 0 32 32'>
    <path
      style={{ fill: { fill }, strokeWidth: 0.26458332, fillOpacity: 1 }}
      d="m 27.890017,25.586928 -9.704318,-6.527722 v 6.527722 L 5.2474149,16.883299 18.185699,8.1796711 V 14.707393 L 27.890017,8.1796711 Z M 27.554745,6.2928461 19.803085,11.643246 V 7.5199021 c 0,-1.8075576 -1.042171,-1.6964293 -1.95185,-1.227056 L 4.1268781,15.765039 c -0.6309566,0.617025 -0.6309566,1.619496 0,2.237299 l 13.7243569,9.471415 c 0.833738,0.519107 1.95185,0.264985 1.95185,-1.276015 v -4.07361 l 7.75166,5.349625 c 0.833737,0.519107 1.926809,0.289099 1.952659,-1.300105 V 7.5688611 c 0.02504,-1.7593773 -1.04298,-1.7453883 -1.952659,-1.276015 z"
      id="Fill-122"
    />
  </svg>
);

export const Reset = ({ fill = '#fffffe' }) => (
  <svg width='32px' height='32px' viewBox='0 0 32 32'>
    <path
      style={{ fill: { fill }, strokeWidth: 0.26458332, fillOpacity: 1 }}
      d="M 29.525333,14.836548 H 27.095081 C 26.27018,9.5127304 21.676377,5.4335314 16.116628,5.4335314 c -4.286921,0 -8.0011153,2.426833 -9.8586368,5.9760456 l 1.5933835,0.636839 c 1.597657,-2.9217716 4.6997993,-4.9032436 8.2652533,-4.9032436 4.613465,0 8.443911,3.3175526 9.250009,7.6933756 h -2.920066 c -0.264992,0.257302 -0.518023,0.415444 -0.138473,0.860806 l 3.188479,3.243186 c 0.264991,0.256462 0.693259,0.256462 0.956544,0 l 3.210704,-3.243186 c 0.264151,-0.257303 0.125646,-0.603504 -0.138473,-0.860806 z M 16.116628,25.949209 c -4.307436,0 -7.9344373,-2.89271 -9.0508328,-6.83856 h 2.7790185 c 0.2649913,-0.25643 0.4026213,-0.603504 0.139345,-0.85995 L 6.7734549,15.00666 c -0.2641515,-0.25643 -0.6924025,-0.25643 -0.9565411,0 l -3.189335,3.244039 c -0.3786839,0.445362 -0.1256464,0.603504 0.1384727,0.85995 H 5.31427 c 1.1591358,4.89812 5.545217,8.548198 10.802358,8.548198 4.000557,0 7.496771,-2.116533 9.456875,-5.282787 l -1.609628,-0.642823 c -1.684848,2.53967 -4.569013,4.215972 -7.847247,4.215972 z"
      id="Fill-116"
    />
  </svg>
);