import React from 'react';
import Cases from './Cases';
import RecordSummary from './RecordSummary';
import { RecordData } from './types';

interface Props {
  record: RecordData;
}

export default class Record extends React.Component<Props> {
  render() {
    const errors = ( this.props.record.errors ?
      this.props.record.errors.map(((errorMessage: string, errorIndex: number) => {
        const id= "record_error_" + errorIndex;

        const errorMessageArray = errorMessage.split(/(\[.*?\])/g);
        const errorMessageHTML = errorMessageArray.map(function (element) {
          if (element.match(/^\[.*\]$/)) {
              const caseNumber = element.slice(1, -1);
              return <a className="underline" href={"#" + caseNumber}>{caseNumber}</a>;
          } else {
              return element;
          }
        });
        return <p role="status" id={id} className="bg-washed-red mv3 pa3 br3 fw6">
                  {errorMessageHTML}
               </p>
        }
        )
      )
      : null
    );

    return (
      <>
      {errors}
      <section>
        {this.props.record.summary ? (
          <RecordSummary summary={this.props.record.summary}/>
          ) : null }
        {this.props.record.cases ? (
          <Cases cases={this.props.record.cases} />
        ) : null}
      </section>
      </>
    );
  }
}
