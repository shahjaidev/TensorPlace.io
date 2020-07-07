import React from 'react';

const Details = (plugin) => (
  <div id="details" className="tab-content current">
    <h3 className="content-title">Description</h3>
    <p>{plugin.longDesc}</p>
    <h3 className="content-title">Input Type</h3>
    <p>{plugin.inputType}</p>
    <h3 className="content-title">Output Type</h3>
    <p>{plugin.outputType}</p>
    <h3 className="content-title">Codebase</h3>
    {plugin.codebase &&
      <ul>
        {plugin.codebase.map((cbase,i) => (
          <li key={i}>{cbase}</li>
        ))}
      </ul>
    }
    <h3 className="content-title">Language</h3>
    {plugin.language &&
      <ul>
        {plugin.language.map((language,i) => (
          <li key={i}>{language}</li>
        ))}
      </ul>
    }
  </div>
);

export default Details;
