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
  consolidatedTotalStores = {};

  constructConsolidatedStores(list) {
    _.each(list, (item) => {

      _.map(item, ({ storeId, storeName, score }) => {
        let storeIndex = _.findIndex(this.consolidatedStores, { 'storeId': storeId });

        if (storeIndex == -1) {
          this.consolidatedStores.push(
            {
              storeId,
              storeName,
              excelente: 0,
              muitobom: 0,
              razoavel: 0,
              ruim: 0,
              horrivel: 0,
              [this.returnQualificationName(score)]: score / score
            }
          )
        } else {
          this.consolidatedStores[storeIndex][this.returnQualificationName(score)] += score / score;
        }
      });
    });
  }

  returnQualificationName(qualificationNumber: number) {
    switch (qualificationNumber) {
      case 1:
        return 'horrivel';
        break;
      case 2:
        return 'ruim';
        break;
      case 3:
        return 'razoavel';
        break;
      case 4:
        return 'muitobom';
        break;
      case 5:
        return 'excelente';
        break;
      default:
        return null;
        break;
    }
  }

  constructConsolidatedTotalStores(consolidatedStores) {
    let excelente = _.reduce(consolidatedStores, (acc, { excelente }) => acc + excelente, 0);
    let muitobom = _.reduce(consolidatedStores, (acc, { muitobom }) => acc + muitobom, 0);
    let razoavel = _.reduce(consolidatedStores, (acc, { razoavel }) => acc + razoavel, 0);
    let ruim = _.reduce(consolidatedStores, (acc, { ruim }) => acc + ruim, 0);
    let horrivel = _.reduce(consolidatedStores, (acc, { horrivel }) => acc + horrivel, 0);
    let totalAvaliations = excelente + muitobom + razoavel + ruim + horrivel;
    let satisfactionPercent = (excelente + muitobom) / (excelente + muitobom + razoavel + ruim + horrivel) * 100;

    this.consolidatedTotalStores = { totalAvaliations, satisfactionPercent, excelente, muitobom, razoavel, ruim, horrivel };
  }


  ngOnInit() {
    let listStores = _.toArray(_.groupBy(this.surveys, 'storeId'));

    this.constructConsolidatedStores(listStores);

    this.constructConsolidatedTotalStores(this.consolidatedStores);
  }
}

