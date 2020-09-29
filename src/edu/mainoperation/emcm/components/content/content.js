import React, { useState } from 'react';
import { Accordion, Breadcrumb, Container } from 'semantic-ui-react';
import Hiring from '../firstpart/hiring';
import AcquaintanceCompany from '../firstpart/acquaintancecompany';
import AcquaintanceWork from '../firstpart/acquaintancework';
import WhyAura from '../firstpart/whyaura';
import ProfitWays from '../firstpart/profitways';
import BusinessTypes from '../firstpart/businesstypes';
import CebilonDemo from '../secondpart/cebilondemo';
import PrepExam from '../secondpart/prepexam';
import TakeExam from '../secondpart/takeexam';
import Recommendations from '../secondpart/recommendations';
import Document from '../secondpart/document';

import Intro from '../secondpart/cebilondemo/intro';
import DemoEnter from '../secondpart/cebilondemo/demoenter';
import Penury from '../secondpart/cebilondemo/penury';
import WaterProblem from '../secondpart/cebilondemo/waterproblem';
import IntroDevice from '../secondpart/cebilondemo/introdevice';
import Tasting from '../secondpart/cebilondemo/tasting';
import Tds from '../secondpart/cebilondemo/tds';
import FingerShow from '../secondpart/cebilondemo/fingershow';
import WaterHelp from '../secondpart/cebilondemo/waterhelp';
import Chlorine from '../secondpart/cebilondemo/chlorine';
import Electro from '../secondpart/cebilondemo/electro';
import NapkinShow from '../secondpart/cebilondemo/napkinshow';
import CebiloneUnique from '../secondpart/cebilondemo/cebilonunique';
import Harm from '../secondpart/cebilondemo/harm';

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
      let varLoad = { ...prev };
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
        case 'cebilondemo':
          varLoad.component = (
            <CebilonDemo
              getLink={data => {
                getLink(data);
              }}
            />
          );
          varLoad.sections.push({ content: 'Cebilon демо обучениясы' });
          break;
        case 'recebilondemo':
          varLoad.component = (
            <CebilonDemo
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
        case 'demoenter':
          varLoad.component = <DemoEnter />;
          varLoad.sections.push({ content: 'Демоға кіру' });
          break;
        case 'penury':
          varLoad.component = <Penury />;
          varLoad.sections.push({ content: 'Қажеттілік туғызу' });
          break;
        case 'waterproblem':
          varLoad.component = <WaterProblem />;
          varLoad.sections.push({ content: 'Ауыз су проблемасы' });
          break;
        case 'introdevice':
          varLoad.component = <IntroDevice />;
          varLoad.sections.push({ content: 'Аппаратты таныстыру' });
          break;
        case 'tasting':
          varLoad.component = <Tasting />;
          varLoad.sections.push({ content: 'Дегустация' });
          break;
        case 'tds':
          varLoad.component = <Tds />;
          varLoad.sections.push({ content: 'ТДС метр' });
          break;
        case 'fingershow':
          varLoad.component = <FingerShow />;
          varLoad.sections.push({ content: 'Саусақ шоу' });
          break;
        case 'waterscale':
          varLoad.component = <WaterHelp />;
          varLoad.sections.push({ content: 'Судың кермектігі' });
          break;
        case 'chlorine':
          varLoad.component = <Chlorine />;
          varLoad.sections.push({ content: 'Хлор тесті' });
          break;
        case 'electro':
          varLoad.component = <Electro />;
          varLoad.sections.push({ content: 'Электролиз' });
          break;
        case 'napkinshow':
          varLoad.component = <NapkinShow />;
          varLoad.sections.push({ content: 'Салфетка шоу' });
          break;
        case 'cebilonunique':
          varLoad.component = <CebiloneUnique />;
          varLoad.sections.push({ content: 'Cebilon Unique' });
          break;
        case 'harm':
          varLoad.component = <Harm />;
          varLoad.sections.push({ content: 'Пластик бөтелкенің зияны' });
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
                getLink('recebilondemo');
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
          <div className="content__edu">
            <h1>Мазмұны</h1>
            <p className="part__name">Бірінші бөлім</p>
            <Accordion>
              <Accordion.Title>
                <h1>Кіріспе</h1>
              </Accordion.Title>
              <Accordion.Content>
                <p className="intro__content__edu">
                  <i>
                    Бұл «Тренинг Cebilon» кітабы Себилонның демо обучениясын
                    үйренуге арналған. Бұл кітап бизнес саласын кеңінен түсініп,
                    жан жақты ой-өрісін кеңейтуге мүмкіндік береді. Өз бойындағы
                    сенімділік пен қабілеттілікті арттырады. Себилон демосын
                    жақсылап үйреніп еліне пайдалы, табысты бизнесмен болуыңызға
                    тілектеспіз.
                  </i>
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
                  getLink('cebilondemo');
                }}
              >
                1) Cebilon демо обучениясы.
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
          </div>
        )}
      </Container>
    </div>
  );
}

export default Content;
