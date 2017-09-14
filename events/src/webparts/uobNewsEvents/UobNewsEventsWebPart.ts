import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
} from '@microsoft/sp-webpart-base';

import * as strings from 'uobNewsEventsStrings';
import UobNewsEvents from './components/UobNewsEvents';
import { IUobNewsEventsProps } from './components/IUobNewsEventsProps';
import { IUobNewsEventsWebPartProps } from './IUobNewsEventsWebPartProps';


var uniArray =
[
  { key: 'news-feed', text: 'All News' },
  { key: 'research', text: 'Research' },
  { key: 'grants_and_awards', text: 'Grants and Awards' },
  { key: 'press_releases', text: 'Press Releases' },
  { key: 'staff_notices', text: 'Staff Notices' },
  { key: 'events', text: 'Events' },              
]

var facultyArray = 
[
  { key: 'foat', text: 'Faculty of Arts' },
  { key: 'fbs', text: 'Faculty of Biomedical Sciences' },
  { key: 'feng', text: 'Faculty of engineering' },
  { key: 'fhs', text: 'Faculty of Health Sciences' },
  { key: 'fsci', text: 'Faculty of Science' },
  { key: 'fssl', text: 'Faculty of Social Scieces and Law' }, 
]



export default class UobNewsEventsWebPart extends BaseClientSideWebPart<IUobNewsEventsWebPartProps> {
  
  private dropDownOptions: IPropertyPaneDropdownOption[] =[];


  public render(): void {
    const element: React.ReactElement<IUobNewsEventsProps > = React.createElement(
      UobNewsEvents,
      {
        HttpClient: this.context.httpClient,
        description: this.properties.description,
        uniArray: uniArray, 
        facultyArray: facultyArray,
        feedProp: this.properties.feedProp
       
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneDropdown('feedProp', {
                  label: 'Select a feed',
                  options: this.dropDownOptions

                })
              ]
            }
          ]
        }
      ]
    };
  }

  //When the property pane loads, populate the dropdown with our feed options 
  protected onPropertyPaneConfigurationStart(): void {  

    this.dropDownOptions.push(
      
      { key: 'news-feed', text: 'All News' },
      { key: 'research', text: 'Research' },
      { key: 'grants_and_awards', text: 'Grants and Awards' },
      { key: 'press_releases', text: 'Press Releases' },
      { key: 'staff_notices', text: 'Staff Notices' },
      { key: 'events', text: 'Events' },
      { key: 'foat', text: 'Faculty of Arts' },
      { key: 'fbs', text: 'Faculty of Biomedical Sciences' },
      { key: 'feng', text: 'Faculty of engineering' },
      { key: 'fhs', text: 'Faculty of Health Sciences' },
      { key: 'fsci', text: 'Faculty of Science' },
      { key: 'fssl', text: 'Faculty of Social Scieces and Law' },     
    
    ); 
 }  

}
