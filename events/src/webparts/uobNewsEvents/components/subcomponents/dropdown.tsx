import * as React from 'react';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';


export default class UOBDropdown extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      selectedItem: null
    };
  }

  public render() {
    let { selectedItem } = this.state;

    return (
      <div className='dropdown'>

        <Dropdown
          label= {this.props.labelText}
          selectedKey={ selectedItem && selectedItem.key }
          //onChanged={ (item) => this.setState({ selectedItem: item }) }
          onChanged={this.props.getSelectedItem}
          options = {this.props.buildOptions}
        
        />

      </div>

    );
  }

  

}