import React, { useState } from 'react';

const AddSchema = () => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState(""); 
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [segmentNameError, setSegmentNameError] = useState("");
  const [schemaError, setSchemaError] = useState("");
  const [duplicateSchemaError, setDuplicateSchemaError] = useState("");

  const schemaOptions = [
    { value: 'first_name', label: 'First Name' },
    { value: 'last_name', label: 'Last Name' },
    { value: 'gender', label: 'Gender' }
  ];

  const addSchema = () => {
    // console.log("selectedSchema schema value came or Not", selectedSchema)
    if (selectedSchema) {
      const selectedOption = schemaOptions.find(option => option.value === selectedSchema);
      if (selectedSchemas.some(schema => schema.key === selectedSchema)) {
        setDuplicateSchemaError("* Your Selected Schema is Schema already added.");
        return;
      }
      setSelectedSchemas([...selectedSchemas, { key: selectedSchema, label: selectedOption.label }]);
      setSelectedSchema("");
      setSchemaError(""); // Clear error when a schema is added
      setDuplicateSchemaError(""); // Clear duplicate error when a new schema is added
    }
  };

  const removeSchema = (index) => {
   // console.log("check index value ", index)
    const newSchemas = [...selectedSchemas];
    //console.log("check new schemas ", new Schemas)
    newSchemas.splice(index, 1);
    setSelectedSchemas(newSchemas);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!segmentName.trim()) {
      setSegmentNameError("* Segment name is required.");
      return;
    }

    if (selectedSchemas.length === 0) {
      setSchemaError("* At least one schema is required. Click +Add New Schema");
      return;
    }

    const segmentData = {
      segment_name: segmentName.trim(),
      schema: selectedSchemas.map(schema => ({ [schema.key]: schema.label })),
    };
   // alert("out put is ", JSON.stringify(segmentData))
    console.log("out put is ", segmentData);
   
    setSegmentName('');
    setSelectedSchemas([]);
    setSegmentNameError('');
    setSchemaError('');
    setDuplicateSchemaError('');
  };

  return (
    <>
      <form className="formStyle" onSubmit={handleFormSubmit}>
        <div className='p-3'>
          <label htmlFor='segmentName' className='fontAlign'>Enter the Name of the Segment</label>
          <input
            className="mt-3 mb-4 segmentInput"
            type="text"
            name="segmentName"
            placeholder='Name of the Segment'
            value={segmentName}
            onChange={(e) => {
              setSegmentName(e.target.value);
              if (segmentNameError) {
                setSegmentNameError("");
              }
            }}
          />
          {segmentNameError && <p className="text-danger errorFont">{segmentNameError}</p>}
          <p className='fontAlign'>To save your segment, you need to add the schemas to build the query</p>
          <div className="row mb-3">
            <div className='d-flex justify-content-end align-items-center gap-2'>
              <div className='d-flex align-items-center gap-2'>
                <span className='bg-success dotButton'></span>
                <span className='tracksAlign'>- User Tracks</span>
              </div>
              <div className='d-flex align-items-center gap-2'>
                <span className='bg-danger dotButton'></span>
                <span className='tracksAlign'>- Group Tracks</span>
              </div>
            </div>
          </div>
          {selectedSchemas.map((schema, index) => (
            <div className='d-flex align-items-center gap-2 ' key={index}>
              <span className={`bg-${schema.key === 'first_name' ? 'success' : schema.key === 'last_name' ? 'danger' : 'warning'} dotButton`}></span>
              <select
                name={`schema-${index}`}
                value={schema.key}
                onChange={(e) => {
                  const selectedOption = schemaOptions.find(option => option.value === e.target.value);
                  const newSchemas = [...selectedSchemas];
                  newSchemas[index] = { key: e.target.value, label: selectedOption.label };
                  setSelectedSchemas(newSchemas);
                }}
              >
                <option value={schema.key}>{schema.label}</option>
                {schemaOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <span className='minusAlignMent'>
                <button type="button" className='minusButton' onClick={() => removeSchema(index)}>
                  -
                </button>
              </span>
            </div>
          ))}
          <div className='d-flex align-items-center gap-2 mt-1 mb-3'>
            <span className='bg-light dotButton'></span>
            <select name="addSchema" value={selectedSchema} onChange={(e) => setSelectedSchema(e.target.value)}>
              <option value="">Add Schema to segment</option>
              {schemaOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <span className='minusAlignMent'>
              <button type="button" className='minusButton'>
                -
              </button>
            </span>
          </div>
          {schemaError && <p className="text-danger fw-bold errorFont">{schemaError}</p>}
          {duplicateSchemaError && <p className="text-danger fw-bold errorFont">{duplicateSchemaError}</p>}
          <div className='d-flex align-items-center gap-1 ' style={{ fontSize: "13px", cursor:"pointer" }}>
            <a className='addButton text-success fw-bolder hoverEffect' onClick={() => addSchema()}>+ Add New Schema</a>
          </div>
        </div>
        <footer className='footStyle'>
          <div className="d-flex align-items-center gap-3">
            <button type="submit" className='bg-success text-white fs-6 py-2 px-3' style={{ borderRadius: "5px" }}>Save Segment</button>
            <button type="button" className='bg-light text-danger fs-6 py-2 px-3' data-bs-dismiss="offcanvas" aria-label="Close" style={{ borderRadius: "5px" }}>Cancel</button>
          </div>
        </footer>
      </form>
    </>
  );
};

export default AddSchema;
