import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

export interface IUOBChoiceGroup {
  selectedKey: string;
}

export default class UOBChoiceGroup extends React.Component<any, IUOBChoiceGroup> {
  constructor() {
    super();

    this.state = {
      selectedKey: 'bar'
    };

    
  }

  public render() {
    let { selectedKey } = this.state;

    return (
      <div>
        <ChoiceGroup 
          label='Pick one image'
          options={ [
          {
            key: 'all',
            iconProps: { iconName: 'Globe' },
            text: 'All University'
          },
          {
            key: 'faculty',
            iconProps: { iconName: 'Group' },
            text: 'Faculty'
          }
        ] }
          onChange={ this.props.getValue }
          defaultSelectedKey={'all'}
          
        />
      </div>
    );
  }

  
}