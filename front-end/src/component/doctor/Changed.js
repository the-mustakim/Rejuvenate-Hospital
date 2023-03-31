import React from 'react'

export default function Changed() {
  return (
    <>
    
    <div class="row">
                    {/* <div class="col-sm">
                      <button
                        class="btn btn-outline-primary"
                        type="button"
                        onClick={decNum}
                        MedId={meds.medicineId}
                        MedName={meds.value}
                      >
                        -
                      </button>
                    </div> */}
                    <div class="col-sm">
                      <input
                        type="text"
                        class="form-control inputTag"
                        value={meds.Quantity}
                        onChange={handleChange}
                      />
                    </div>
                    {/* <div class="col-sm">
                      <button
                        class="btn btn-outline-primary"
                        type="button"
                        onClick={incNum}
                        MedId={meds.medicineId}
                        MedName={meds.value}
                      >
                        +
                      </button>
                    </div> */}
                  </div>
    </>
  )
}
