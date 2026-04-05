const infoData = {
  bombe1: {
    title: 'Før nedslag',
    description:
      'Hvis der varsles atomangreb, skal du straks søge mod kælder, beskyttelsesrum eller en massiv bygning. Gå væk fra vinduer, glas og åbne pladser.',
    efficiency: [
      'Søg øjeblikkeligt dækning under jord eller bag tykke vægge',
      'Tag vand, radio, lommelygte og førstehjælp med',
      'Luk døre, vinduer og ventilation hvis du når det'
    ],
    requirement: [
      'Undgå panik og hurtige flokbevægelser',
      'Se ikke mod lysglimtet',
      'Hold børn og sårbare personer tæt på dig'
    ]
  },
  bombe2: {
    title: 'Under eksplosion',
    description:
      'Ved lysglimt og trykbølge skal du kaste dig ned, vende ansigtet væk og beskytte hoved og nakke. Bliv i dækning til trykbølgen er passeret.',
    efficiency: [
      'Læg dig fladt ned med ansigtet væk fra eksplosionen',
      'Dæk hoved og nakke med arme, jakke eller stof',
      'Vent nogle sekunder ekstra før du rejser dig'
    ],
    requirement: [
      'Stå ikke tæt ved vinduer eller løse genstande',
      'Undgå at løbe i panik midt i trykbølgen',
      'Søg hurtigst muligt indendørs efter første chokbølge'
    ]
  },
  bombe3: {
    title: 'Efter nedslag',
    description:
      'Efter et atomnedslag er radioaktivt nedfald en stor fare. Bliv indenfor, forsegl rummet og vent på beskeder fra myndigheder eller nødradio.',
    efficiency: [
      'Bliv indenfor i mindst 24 til 48 timer hvis muligt',
      'Fjern støvet tøj og vask udsat hud forsigtigt',
      'Spis kun beskyttet mad og drik rent vand'
    ],
    requirement: [
      'Undgå unødvendige ture udenfor',
      'Lyt til radio og officielle meldinger',
      'Gem rationer og hold energien nede'
    ]
  },
  soldat: {
    title: 'Møde med fjendtlige styrker',
    description:
      'Hvis du møder fjendens soldater, skal du undgå konfrontation. Hold hænderne synlige, bevæg dig roligt og gør intet som kan opfattes som truende.',
    efficiency: [
      'Hold afstand og undgå pludselige bevægelser',
      'Tal kort, roligt og kun hvis du bliver tiltalt',
      'Søg væk fra kontrolposter når det kan gøres sikkert'
    ],
    requirement: [
      'Løb ikke mod bevæbnede soldater',
      'Bær ikke noget der kan ligne et våben',
      'Forsøg at beskytte børn og andre bag dig'
    ]
  }
};

const infoTitle = document.querySelector('#info-title');
const infoDescription = document.querySelector('#info-description');
const efficiencyList = document.querySelector('#efficiency-list');
const requirementList = document.querySelector('#requirement-list');
const infographicObject = document.querySelector('#infographic-object');
let activeElement = null;

function fillList(target, items) {
  target.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    target.appendChild(li);
  });
}

function updatePanel(data) {
  infoTitle.textContent = data.title;
  infoDescription.textContent = data.description;
  fillList(efficiencyList, data.efficiency);
  fillList(requirementList, data.requirement);
}

function setActiveElement(element) {
  if (activeElement) {
    activeElement.classList.remove('is-active');
  }
  activeElement = element;
  if (activeElement) {
    activeElement.classList.add('is-active');
  }
}

function makeInteractive(element, dataKey) {
  if (!element) return;

  element.classList.add('svg-hotspot');
  element.style.cursor = 'pointer';
  element.setAttribute('tabindex', '0');
  element.setAttribute('role', 'button');
  element.setAttribute('aria-label', infoData[dataKey].title);

  const activate = () => {
    updatePanel(infoData[dataKey]);
    setActiveElement(element);
  };

  element.addEventListener('click', activate);
  element.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      activate();
    }
  });
}

function injectSvgStyles(svgDoc) {
  const style = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'style');
  style.textContent = `
    .svg-hotspot {
      transition: filter 180ms ease, opacity 180ms ease, transform 180ms ease;
      transform-box: fill-box;
      transform-origin: center;
      outline: none;
    }

    .svg-hotspot:hover,
    .svg-hotspot:focus {
      opacity: 1;
      filter: drop-shadow(0 0 18px rgba(220, 44, 44, 1)) drop-shadow(0 0 36px rgba(220, 44, 44, 1)) drop-shadow(0 0 62px rgba(220, 44, 44, 0.9)) drop-shadow(0 0 88px rgba(220, 44, 44, 0.62));
    }

    .svg-hotspot.is-active {
      filter: drop-shadow(0 0 20px rgba(230, 52, 52, 1)) drop-shadow(0 0 44px rgba(230, 52, 52, 1)) drop-shadow(0 0 70px rgba(230, 52, 52, 0.92)) drop-shadow(0 0 98px rgba(230, 52, 52, 0.72));
    }
  `;
  svgDoc.documentElement.appendChild(style);
}

if (infographicObject) {
  infographicObject.addEventListener('load', () => {
    const svgDoc = infographicObject.contentDocument;
    if (!svgDoc) return;

    injectSvgStyles(svgDoc);

    const bombe1 = svgDoc.getElementById('bombe_1') || svgDoc.getElementById('bombe_x5F_1');
    const bombe2 = svgDoc.getElementById('bombe_2') || svgDoc.getElementById('bombe_x5F_2');
    const bombe3 = svgDoc.getElementById('bombe_3') || svgDoc.getElementById('bombe_x5F_3');
    const soldat = svgDoc.getElementById('soldat');

    makeInteractive(bombe1, 'bombe1');
    makeInteractive(bombe2, 'bombe2');
    makeInteractive(bombe3, 'bombe3');
    makeInteractive(soldat, 'soldat');
    if (bombe1) {
      bombe1.click();
    }
  });
}
