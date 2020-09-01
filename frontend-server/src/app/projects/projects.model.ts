import { Project } from './project.model';

export const Projects: Project[] = [
  {
    img: 'assets/beardog.png',
    link: 'https://github.com/riskmatf/beardog',
    name: 'BearDog',
    desc: 'Alat namenjen generisanju LaTeX dokumenata iz beardog sintakse. Ova sintaksa inspirisana je sintaksama poput jinja2, blade, twigg i omogućava pisanje LaTeX dokumenata korišćenjem šablona, promenljivih, petlji i slično.',
    contributors: [
      {
        name: 'Nemanja Mićović'
      },
      {
        name: 'Peđa Trifunov'
      }
    ]
  },
  {
    img: 'assets/vrmatf.png',
    link: 'https://github.com/riskmatf/vrmatf',
    name: 'VR MATF',
    desc: 'VR aplikacija bazirana na Cardboard SDK koja se koristi za vizuelizaciju nekih zanimljivih algoritama ili pojava iz oblasti računarstva.',
    contributors: [
      {
        name: 'Nemanja Mićović'
      },
      {
        name: 'Peđa Trifunov'
      },
      {
        name: 'Vuk Novaković'
      }
    ]
  },
  {
    img: 'assets/risk-square-logo.png',
    link: 'https://github.com/riskmatf/riskmatf.github.io',
    name: 'RISK zvanična stranica',
    desc: 'Veb strana posvećena organizaciji RISK. Bazirana na alatu Jekyll i aktivno održavana od strane RISK zajednice.',
    contributors: [
      {
        name: 'Nemanja Mićović'
      },
      {
        name: 'Stevan Nestorović'
      },
      {
        name: 'Peđa Trifunov'
      },
      {
        name: 'Vuk Novaković'
      },
      {
        name: 'Aleksandar Stefanović'
      }
    ]
  },
  {
    img: 'assets/risk-square-logo.png',
    link: 'https://github.com/riskmatf/risk-media',
    name: 'RISK medijski sadržaj',
    desc: 'Repozitorijum posvećen skladištenju raznog medijskog sadržaja organizacije RISK. Ohrabruju se svi da doprinesu! :)',
    contributors: [
      {
        name: 'Nemanja Mićović'
      },
      {
        name: 'Peđa Trifunov'
      }
    ]
  },
];
