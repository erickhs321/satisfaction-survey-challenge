import { Component, OnInit } from '@angular/core';
import { _ } from 'underscore';


@Component({
  selector: 'app-satisfaction-survey',
  templateUrl: './satisfaction-survey.component.html',
  styleUrls: ['./satisfaction-survey.component.scss']
})
export class SatisfactionSurveyComponent implements OnInit {

  constructor() { }

  surveys = [
    {
      "id": 1,
      "date": "2018-09-01T13:27:57.334Z",
      "storeId": 1,
      "storeName": "Dito Savassi",
      "score": 5
    },
    {
      "id": 2,
      "date": "2018-09-01T13:27:57.334Z",
      "storeId": 2,
      "storeName": "Dito Rio de Janeiro",
      "score": 4
    },
    {
      "id": 3,
      "date": "2018-09-02T13:27:57.334Z",
      "storeId": 1,
      "storeName": "Dito Savassi",
      "score": 5
    },
    {
      "id": 4,
      "date": "2018-09-3T13:27:57.334Z",
      "storeId": 1,
      "storeName": "Dito Savassi",
      "score": 3
    },
    {
      "id": 5,
      "date": "2018-09-03T13:27:57.334Z",
      "storeId": 1,
      "storeName": "Dito Savassi",
      "score": 2
    }
  ];

  consolidatedStores = [];

  ngOnInit() {
    const horrivel = 'horrivel';
    const ruim = 'ruim';
    const razoavel = 'razoavel';
    const muitobom = 'muitobom';
    const excelente = 'excelente';

    let listStores = _.toArray(_.groupBy(this.surveys, 'storeId'))

    _.each(listStores, (item) => {

      _.map(item, ({ storeId, storeName, score }) => {
        let storeIndex = _.findIndex(this.consolidatedStores, { 'storeId': storeId });

        if (storeIndex == -1) {
          this.consolidatedStores.push(
            {
              storeId,
              storeName,
              [excelente]: 0,
              [muitobom]: 0,
              [razoavel]: 0,
              [ruim]: 0,
              [horrivel]: 0,
              [returnQualificationName(score)]: score / score
            }
          )
        } else {
          this.consolidatedStores[storeIndex][returnQualificationName(score)] += score / score
        }
      })

      function returnQualificationName(qualificationNumber: number) {
        switch (qualificationNumber) {
          case 1:
            return horrivel
            break;
          case 2:
            return ruim
            break;
          case 3:
            return razoavel
            break;
          case 4:
            return muitobom
            break;
          case 5:
            return excelente
            break;
          default:
            return null
            break;
        }
      }
    })
  }
}
