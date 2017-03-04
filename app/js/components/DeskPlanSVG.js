import React from 'react';
import SVG   from 'react-inlinesvg';

const DeskPlanSVG = React.createClass({

    render() {
        return (
            <SVG src="/images/desk_plan.svg" uniquifyIDs={false} onLoad={this.props.whenLoaded}>
                Fallback...
            </SVG>
        )
    }

});

export default DeskPlanSVG;