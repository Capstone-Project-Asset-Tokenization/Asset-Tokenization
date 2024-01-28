import React from 'react'

function AssetHighlightRow() {
  let row = [
    {
      id: 1,
      name: 'John Doe',
      category: 'Student',
      image: 'https://picsum.photos/200',
      verified: true
    },
    {
      id: 2,
      name: 'Jane Doe',
      category: 'Student',
      image: 'https://picsum.photos/200',
      verified: false
    },
    {
      id: 3,
      name: 'John Smith',
      category: 'Teacher',
      image: 'https://fastly.picsum.photos/id/96/200/200.jpg?hmac=OWdGKA_6EKn7IZEMPRZ-F_wvRBZlDHi-n9QCzIKJV_4',
      verified: true
    },
    {
      id: 4,
      name: 'Jane Smith',
      category: 'Teacher',
      image: 'https://fastly.picsum.photos/id/96/200/200.jpg?hmac=OWdGKA_6EKn7IZEMPRZ-F_wvRBZlDHi-n9QCzIKJV_4',
      verified: false
    }
  ]
  return (
    <div>

        {/* write a code that is a row that display a data of row number, circular profile image, name, category, view detail btn and verify btn */}
        
        {
          row.map((item, index) => {
            return (
              <div key={index}>
                <p>{item.id}</p>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <button>View Detail</button>
                <button>{item.verified ? 'Verified' : 'Verify'}</button>
              </div>
            )
          })
        }
        



    </div>
  )
}

export default AssetHighlightRow