import React, { useState } from 'react';
import { Accordion, Container, Breadcrumb } from 'semantic-ui-react';
import Hiring from '../firstpart/hiring';
import AcquaintanceCompany from '../firstpart/acquaintancecompany';
import AcquaintanceWork from '../firstpart/acquaintancework';
import WhyAura from '../firstpart/whyaura';
import ProfitWays from '../firstpart/profitways';
import BusinessTypes from '../firstpart/businesstypes';
import RobocleanDemo from '../secondpart/robocleandemo';
import PrepExam from '../secondpart/prepexam';
import TakeExam from '../secondpart/takeexam';
import Recommendations from '../secondpart/recommendations';
import Document from '../secondpart/document';

import Intro from '../secondpart/robocleandemo/intro';
import LampShow from '../secondpart/robocleandemo/lampshow';
import AirWash from '../secondpart/robocleandemo/airwash';
import VacKill from '../secondpart/robocleandemo/vackill';
import MiniVac from '../secondpart/robocleandemo/minivac';
import Visualizer from '../secondpart/robocleandemo/visualizer';
import Vacuum from '../secondpart/robocleandemo/vacuum';
import CarpetShow from '../secondpart/robocleandemo/carpetshow';
import Mattress from '../secondpart/robocleandemo/mattress';
import WashFunc from '../secondpart/robocleandemo/washfunc';
import Nozzle from '../secondpart/robocleandemo/nozzle';

import './content.css';
import '../back.css';

function Content(props) {
  const load = {
    component: null,
    sections: [
      {
        content: 'Мазмұны',
      },
    ],
  };
  const [loadState, setLoadState] = useState({ ...load });
  const [loadingComponent, setLoadingComponent] = useState(false);

  const getLink = fieldname => {
    setLoadState(prev => {
      var varLoad = { ...prev };
      switch (fieldname) {
        case 'hiring':
          varLoad.component = <Hiring />;
          varLoad.sections.push({ content: 'Жұмысқа қабылдау' });
          break;
        case 'acquaintancecompany':
          varLoad.component = <AcquaintanceCompany />;
          varLoad.sections.push({ content: 'Компаниямен таныстыру' });
          break;
        case 'acquaintancework':
          varLoad.component = <AcquaintanceWork />;
          varLoad.sections.push({ content: 'Жұмыс барысымен таныстыру' });
          break;
        case 'whyaura':
          varLoad.component = <WhyAura />;
          varLoad.sections.push({ content: 'Неліктен Aura?' });
          break;
        case 'profitways':
          varLoad.component = <ProfitWays />;
          varLoad.sections.push({ content: 'Табыс табудың жолдары' });
          break;
        case 'businesstypes':
          varLoad.component = <BusinessTypes />;
          varLoad.sections.push({ content: 'Бизнес және оның түрлері' });
          break;
        case 'robocleandemo':
          varLoad.component = (
            <RobocleanDemo
              getLink={data => {
                getLink(data);
              }}
            />
          );
          varLoad.sections.push({ content: 'Roboclean демо обучениясы' });
          break;
        case 'rerobocleandemo':
          varLoad.component = (
            <RobocleanDemo
              getLink={data => {
                getLink(data);
              }}
            />
          );
          break;
        case 'prepexam':
          varLoad.component = <PrepExam />;
          varLoad.sections.push({ content: 'Экзаменге дайындау' });
          break;
        case 'takeexam':
          varLoad.component = <TakeExam />;
          varLoad.sections.push({ content: 'Экзамен қабылдау' });
          break;
        case 'recommendations':
          varLoad.component = <Recommendations />;
          varLoad.sections.push({ content: 'Рекомендация алу' });
          break;
        case 'document':
          varLoad.component = <Document />;
          varLoad.sections.push({ content: 'Құжаттармен танысу және толтыру' });
          break;
        case 'intro':
          varLoad.component = <Intro />;
          varLoad.sections.push({ content: 'Introduction' });
          break;
        case 'lampshow':
          varLoad.component = <LampShow />;
          varLoad.sections.push({ content: 'Lamp show' });
          break;
        case 'airwash':
          varLoad.component = <AirWash />;
          varLoad.sections.push({ content: 'Air wash' });
          break;
        case 'vackill':
          varLoad.component = <VacKill />;
          varLoad.sections.push({ content: 'Vac kill' });
          break;
        case 'minivac':
          varLoad.component = <MiniVac />;
          varLoad.sections.push({ content: 'Mini vac' });
          break;
        case 'visualizer':
          varLoad.component = <Visualizer />;
          varLoad.sections.push({ content: 'Visualizer' });
          break;
        case 'vacuum':
          varLoad.component = <Vacuum />;
          varLoad.sections.push({ content: 'Vacuum' });
          break;
        case 'carpetshow':
          varLoad.component = <CarpetShow />;
          varLoad.sections.push({ content: 'Carpet show' });
          break;
        case 'mattress':
          varLoad.component = <Mattress />;
          varLoad.sections.push({ content: 'Матрас show' });
          break;
        case 'washfunc':
          varLoad.component = <WashFunc />;
          varLoad.sections.push({ content: 'Жуу функциясы' });
          break;
        case 'nozzle':
          varLoad.component = <Nozzle />;
          varLoad.sections.push({ content: 'Насадкалармен таныстыру' });
          break;
      }
      setLoadingComponent(true);
      return varLoad;
    });
  };
  const handleBreadcrumb = breadcrumb => {
    const len = breadcrumb ? breadcrumb.length : 0;
    const items = [];

    if (len > 0) {
      const breadcrumbs = breadcrumb.map(t => t['content']);

      if (len === 1) {
        items.push([
          <Breadcrumb.Section active key="0">
            {breadcrumbs[0]}
          </Breadcrumb.Section>,
        ]);
      } else {
        items.push([
          <Breadcrumb.Section
            link
            key="0"
            onClick={() => {
              setLoadingComponent(false);
              defaultState(len);
            }}
          >
            {breadcrumbs[0]}
          </Breadcrumb.Section>,
        ]);
      }
      for (let i = 1; i < len; i++) {
        const lastItem = i === len - 1;

        items.push([<Breadcrumb.Divider icon="right chevron" key={`d${i}`} />]);
        if (lastItem) {
          items.push([
            <Breadcrumb.Section active key={i}>
              {breadcrumbs[i]}
            </Breadcrumb.Section>,
          ]);
        } else {
          items.push([
            <Breadcrumb.Section
              link
              key={i}
              onClick={() => {
                getLink('rerobocleandemo');
                defaultState(len - 1);
              }}
            >
              {breadcrumbs[i]}
            </Breadcrumb.Section>,
          ]);
        }
      }
    }
    return (
      <Breadcrumb className="breadcrumbs" size="small">
        {items}
      </Breadcrumb>
    );
  };

  const defaultState = length => {
    if (length === 2) {
      setLoadState(prev => {
        let varLoad = { ...prev };
        varLoad.sections.splice(
          loadState.sections.length - 1,
          loadState.sections.length - 1,
        );
        return varLoad;
      });
    } else {
      setLoadState(prev => {
        let varLoad = { ...prev };
        varLoad.sections.splice(
          loadState.sections.length - 2,
          loadState.sections.length - 1,
        );
        return varLoad;
      });
    }
  };

  return (
    <div className="back">
      <Container>
        {handleBreadcrumb(loadState.sections)}
        {loadingComponent ? (
          loadState.component
        ) : (
          <div className="content__edu ">
            <h1>Мазмұны</h1>
            <p className="part__name">Бірінші бөлім</p>
            <Accordion>
              <Accordion.Title>
                <h1>Кіріспе</h1>
              </Accordion.Title>
              <Accordion.Content>
                <p className="intro__content__edu">
                  Бұл «Тренинг Roboclean» кітабы Roboclean-нің демо обучениясын
                  үйренуге арналған. Бұл кітап бизнес саласын кеңінен түсініп,
                  жан жақты ой-өрісін кеңейтуге мүмкіндік береді. Өз бойындағы
                  сенімділік пен қабілеттілікті арттырады. Roboclean демосын
                  жақсылап үйреніп еліне пайдалы, табысты бизнесмен болуыңызға
                  тілектеспіз.
                </p>
              </Accordion.Content>
            </Accordion>
            <br />
            <div className="content__links">
              <p
                onClick={() => {
                  getLink('hiring');
                }}
              >
                1) Жұмыс іздеушіні жұмысқа қабылдау.
              </p>
              <p
                onClick={() => {
                  getLink('acquaintancecompany');
                }}
              >
                2) Компаниямен таныстыру.
              </p>
              <p
                onClick={() => {
                  getLink('acquaintancework');
                }}
              >
                3) Жұмыс барысымен таныстыру
              </p>
              <p
                onClick={() => {
                  getLink('whyaura');
                }}
              >
                4) Мен неліктен Aura компаниясын таңдаймын?
              </p>
              <p
                onClick={() => {
                  getLink('profitways');
                }}
              >
                5) Табыс табудың жолдары .
              </p>
              <p
                onClick={() => {
                  getLink('businesstypes');
                }}
              >
                6) Бизнес және оның түрлері.
              </p>
            </div>
            <br />
            <p className="part__name">Екінші бөлім</p>
            <br />
            <div className="content__links">
              <p
                onClick={() => {
                  getLink('robocleandemo');
                }}
              >
                1) Roboclean демо обучениясы.
              </p>
              <p
                onClick={() => {
                  getLink('prepexam');
                }}
              >
                2) Экзаменге дайындау.
              </p>
              <p
                onClick={() => {
                  getLink('takeexam');
                }}
              >
                3) Экзамен қабылдау.
              </p>
              <p
                onClick={() => {
                  getLink('recommendations');
                }}
              >
                4) Рекомендация алу.
              </p>
              <p
                onClick={() => {
                  getLink('document');
                }}
              >
                5) Құжаттармен танысу және толтыру.
              </p>
            </div>
            <br />
            <p className="part__name">Үшінші бөлім</p>
            <br />
            <div className="content__links">
              <p>1) Эмоцияға әсер.</p>
              <p>2) Sell closing.</p>
              <p>3) Сенімге кіру.</p>
              <p>4) Демода контакт.</p>
              <p>5) Клиентпен жұмыс және рекомендация алу. </p>
              <p>6) Жетістікке жетудің жолдары. </p>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Content;
