import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { VelocityComponent } from 'velocity-react';
import { LEGACY_URL } from '../../utils/constants';

const Loading = ({ style }) => <div style={style}>loading...</div>;
Loading.propTypes = {
  style: PropTypes.object,
};

const Toggle = ({ style, terminal }) => {
  const { height, width } = style;
  return (
    <div style={style.base}>
      <div style={style.wrapper}>
        {terminal ? (
          <svg
            fill="#000000"
            height={height}
            viewBox="0 0 24 24"
            width={width}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="white" />
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
          </svg>
        ) : (
          <svg
            fill="#000000"
            height={height}
            viewBox="0 0 24 24"
            width={width}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        )}
      </div>
    </div>
  );
};
Toggle.propTypes = {
  style: PropTypes.object,
};

const Header = ({ node, style, terminal, lang }) => {
  const nodeName = node.translations[this.a.lang];
  return (
    <div style={style.base}>
      <div style={style.title}>
        {terminal ? (
          node.link.endsWith('.xhtml') ? (
            <Link target="_blank" to={`${LEGACY_URL}/${node.link}`}>
              {nodeName}
            </Link>
          ) : (
            <Link to={node.link}>{nodeName}</Link>
          )
        ) : (
          nodeName
        )}
      </div>
    </div>
  );
};
Header.propTypes = {
  style: PropTypes.object,
  node: PropTypes.object.isRequired,
};

class Container extends React.Component {
  render() {
    const { style, decorators, onClick, node } = this.props;
    return (
      <div
        onClick={onClick}
        ref={ref => (this.clickableRef = ref)}
        style={style.container}
      >
        {this.renderToggle()}
        <decorators.Header
          node={node}
          style={style.header}
          terminal={node.leaf}
        />
      </div>
    );
  }

  renderToggle() {
    const { animations } = this.props;

    if (!animations) {
      return this.renderToggleDecorator();
    }

    return (
      <VelocityComponent
        animation={animations.toggle.animation}
        duration={animations.toggle.duration}
        ref={ref => (this.velocityRef = ref)}
      >
        {this.renderToggleDecorator()}
      </VelocityComponent>
    );
  }

  renderToggleDecorator() {
    const { style, decorators, /* terminal, */ node } = this.props;

    return <decorators.Toggle style={style.toggle} terminal={node.leaf} />;
  }
}

Container.propTypes = {
  style: PropTypes.object.isRequired,
  decorators: PropTypes.object.isRequired,
  terminal: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  animations: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
    .isRequired,
  node: PropTypes.object.isRequired,
};

export default {
  Loading,
  Toggle,
  Header,
  Container,
};
