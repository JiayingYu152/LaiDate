class RotatingLogo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
            .svg-root {
                perspective: 1000px;
                width: 100%; /* this is KEY */
                height: 100%; /* this is KEY */
                display: flex;
                justify-content: center;
                align-items: center;
            }
            svg {
                width: 100%; /* this is KEY */
                height: 100%; /* this is KEY */
                transition: transform 0.3s;
                transform-style: preserve-3d;
                display: block;
                margin: auto;
            }
        `;

    const container = document.createElement("div");
    container.classList.add("svg-root");
    container.innerHTML = `
        <svg viewBox="0 0 100 125" id="svg-item">
        <!-- Define dynamically updated shadows -->
        <defs>
          <filter id="dynamic-shadow" height="200%" width="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.0" result="blur" />
            <feOffset id="shadow-offset" dx="0" dy="0" result="offsetBlur" />
            <feMerge>
              <feMergeNode in="offsetBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <!-- largest red heart -->
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 37 32"
          enable-background="new 0 0 37 32"
          xml:space="preserve"
          fill="#000000"
          filter="url(#dynamic-shadow)"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <path
                fill="#D90429"
                d="M33.582,2.483c-1.776-1.56-4.077-2.418-6.481-2.418c-2.767,0-5.49,1.134-7.472,3.112l-0.781,0.778 c-0.188,0.188-0.508,0.188-0.697,0l-1.027-1.024C15.23,1.041,12.711,0,10.032,0C7.415,0,4.938,1,3.059,2.814 c-1.87,1.805-2.911,4.287-2.933,6.988c-0.023,2.824,1.095,5.573,3.067,7.541l14.252,14.22C17.728,31.845,18.103,32,18.5,32 s0.772-0.155,1.055-0.437L34.061,17.09c1.952-1.948,3.021-4.645,2.934-7.399C36.906,6.897,35.693,4.338,33.582,2.483z M33.355,16.382L18.849,30.855c-0.188,0.188-0.51,0.188-0.697,0L3.899,16.635c-1.784-1.779-2.794-4.267-2.773-6.824 c0.02-2.431,0.953-4.66,2.627-6.277C5.445,1.9,7.675,1,10.032,1c2.413,0,4.681,0.938,6.387,2.64l1.026,1.024 c0.565,0.564,1.545,0.564,2.11,0l0.78-0.778c1.796-1.792,4.263-2.82,6.766-2.82c2.161,0,4.228,0.77,5.821,2.169 c1.902,1.67,2.993,3.974,3.073,6.488C36.075,12.238,35.138,14.603,33.355,16.382z"
              ></path>
            </g>
          </g>
        </svg>

        <!-- second largest dark-pink heart -->
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="-6.5 -7 50 43"
          enable-background="new 0 0 47 42"
          xml:space="preserve"
          fill="#FF758F"
          filter="url(#dynamic-shadow)"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <path
                fill="#FF758F"
                d="M33.582,2.483c-1.776-1.56-4.077-2.418-6.481-2.418c-2.767,0-5.49,1.134-7.472,3.112l-0.781,0.778 c-0.188,0.188-0.508,0.188-0.697,0l-1.027-1.024C15.23,1.041,12.711,0,10.032,0C7.415,0,4.938,1,3.059,2.814 c-1.87,1.805-2.911,4.287-2.933,6.988c-0.023,2.824,1.095,5.573,3.067,7.541l14.252,14.22C17.728,31.845,18.103,32,18.5,32 s0.772-0.155,1.055-0.437L34.061,17.09c1.952-1.948,3.021-4.645,2.934-7.399C36.906,6.897,35.693,4.338,33.582,2.483z M33.355,16.382L18.849,30.855c-0.188,0.188-0.51,0.188-0.697,0L3.899,16.635c-1.784-1.779-2.794-4.267-2.773-6.824 c0.02-2.431,0.953-4.66,2.627-6.277C5.445,1.9,7.675,1,10.032,1c2.413,0,4.681,0.938,6.387,2.64l1.026,1.024 c0.565,0.564,1.545,0.564,2.11,0l0.78-0.778c1.796-1.792,4.263-2.82,6.766-2.82c2.161,0,4.228,0.77,5.821,2.169 c1.902,1.67,2.993,3.974,3.073,6.488C36.075,12.238,35.138,14.603,33.355,16.382z"
              ></path>
            </g>
          </g>
        </svg>

        <!-- smallest pink heart -->
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="-20.5 -26 78 73"
          enable-background="new 0 0 67 62"
          xml:space="preserve"
          fill="#FFB3C1"
          filter="url(#dynamic-shadow)"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <path
                fill="#FFB3C1"
                d="M33.582,2.483c-1.776-1.56-4.077-2.418-6.481-2.418c-2.767,0-5.49,1.134-7.472,3.112l-0.781,0.778 c-0.188,0.188-0.508,0.188-0.697,0l-1.027-1.024C15.23,1.041,12.711,0,10.032,0C7.415,0,4.938,1,3.059,2.814 c-1.87,1.805-2.911,4.287-2.933,6.988c-0.023,2.824,1.095,5.573,3.067,7.541l14.252,14.22C17.728,31.845,18.103,32,18.5,32 s0.772-0.155,1.055-0.437L34.061,17.09c1.952-1.948,3.021-4.645,2.934-7.399C36.906,6.897,35.693,4.338,33.582,2.483z M33.355,16.382L18.849,30.855c-0.188,0.188-0.51,0.188-0.697,0L3.899,16.635c-1.784-1.779-2.794-4.267-2.773-6.824 c0.02-2.431,0.953-4.66,2.627-6.277C5.445,1.9,7.675,1,10.032,1c2.413,0,4.681,0.938,6.387,2.64l1.026,1.024 c0.565,0.564,1.545,0.564,2.11,0l0.78-0.778c1.796-1.792,4.263-2.82,6.766-2.82c2.161,0,4.228,0.77,5.821,2.169 c1.902,1.67,2.993,3.974,3.073,6.488C36.075,12.238,35.138,14.603,33.355,16.382z"
              ></path>
            </g>
          </g>
        </svg>
        />

        <!-- red arrow point to center -->
        <svg
          width="50px"
          height="170px"
          viewBox="-4 -4 28 28"
          id="meteor-icon-kit__solid-location-arrow"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          filter="url(#dynamic-shadow)"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.755196 8.8346L21.7285 -0.038704C21.9775 -0.144081 22.2587 -0.144081 22.5077 -0.038704C23.0164 0.17649 23.2543 0.76327 23.0391 1.2719L14.1658 22.2452C14.0434 22.5345 13.7921 22.7495 13.4873 22.8257C12.9515 22.9596 12.4086 22.6339 12.2747 22.0981L10.0002 13.0002L0.9023 10.7257C0.597527 10.6495 0.346275 10.4345 0.223868 10.1452C0.0086761 9.6366 0.246559 9.0498 0.755196 8.8346z"
              fill="#A11D33"
            ></path>
          </g>
        </svg>
      </svg>
        `;

    this.shadowRoot.append(style, container);

    // Add interactions
    const svgRoot = container.querySelector("svg#svg-item");
    const shadowOffset = svgRoot.querySelector("#shadow-offset");

    svgRoot.addEventListener("mousemove", (e) => {
      const rect = svgRoot.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (y / rect.height) * 80;
      const rotateY = (-x / rect.width) * 80;

      svgRoot.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      shadowOffset.setAttribute("dx", rotateY / 15);
      shadowOffset.setAttribute("dy", -rotateX / 15);
    });

    svgRoot.addEventListener("mouseleave", () => {
      svgRoot.style.transform = "";
      shadowOffset.setAttribute("dx", "0");
      shadowOffset.setAttribute("dy", "0");
    });
  }
}

customElements.define("rotating-logo", RotatingLogo);
