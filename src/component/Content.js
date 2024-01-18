import React, { useEffect, useState } from 'react'
import { Col, Form, Input, Button, Row, Empty, Card, Modal } from 'antd';
import axios from 'axios';
const buah = [
  {
    id: 1,
    nama: "apel",
    harga: 10000,
    stock: 10,
    kategori: "lokal",
  },
  {
    id: 2,
    nama: "jeruk",
    harga: 15000,
    stock: 15,
    kategori: "lokal",
  },
  {
    id: 3,
    nama: "mangga",
    harga: 20000,
    stock: 20,
    kategori: "lokal",
  },
  {
    id: 4,
    nama: "anggur",
    harga: 30000,
    stock: 30,
    kategori: "import",
  },
  {
    id: 5,
    nama: "melon",
    harga: 25000,
    stock: 25,
    kategori: "import",
  },
];

function Content() {

  const [count, setCount] = useState(0);
  const [formInstance] = Form.useForm();
  const [dataBuah, setDataBuah] = useState(buah);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buahModal, setBuahModal] = useState(false);
  const [data, setData] = useState([]); 
  const [skip, setSkip] = useState(0);

  //plus minus
  // const handleIncrement = () => {
  //   setCount( count + 1)
  // };
  // const handleDecrement = () => {
    
  //     if (count === 0 ) {
  //       setCount( count - 0 );
  //     }
  //     else {
  //      setCount( count - 1 );
  //     }
      
  // };

  // reduce data buah
  // const handleAddFruit =() =>{
  // const addBuah = (formData) => {setDataBuah((prevDataBuah)=> [...prevDataBuah,  formData] )}

  // add data buah
  const addBuah = (formData) => {
    setDataBuah((prevDataBuah)=> {
      const id = prevDataBuah.length + 1;
      const newData = {...formData, id};
      return [...prevDataBuah, newData];
    });
  };

  // filter
  // const getBuah =  buah.filter ((item) => item.stock > 10);

  // delete pake filter
  const filterDelete = (id) =>  setDataBuah (dataBuah.filter ((item) => item.id != id));

  const filterBuah = (formData) => 
    setDataBuah (dataBuah.filter((item) => item.harga === formData.harga || item.nama === formData.nama || item.kategori == formData.kategori ))
  
  // modal
  const showModal = (item) => {
    // alert(id);
    // const ambilBuah = (id) => 
    formInstance.setFields({
      id: item.id,
      nama: item.nama,
      harga: item.harga,
      stock: item.stock,
      kategori: item.kategori,
    })
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  // useEffect
  useEffect(()=>{
    axios.get(`https://dummyjson.com/products/?limit=4&skip=${skip}`)
    .then((res)=> setData((prevData) => [...prevData, ...res.data?.products])
      // console.log(res.data?.products);
    )
    .catch((err) => {
      // setData([])
      console.log(err)
    })
  }, [skip])

  const handleMore = () => {

    setSkip( skip + 4 )
  }


  return (
    <Row style={{padding: 24}}>
        <Row style={{justifyContent : "center", marginBottom: "20px"}}>
            <Card title="Filter Buah" bordered={true} style={{ width: "100%" }}>
              <Form onFinish={filterBuah}>
                <Row >
                  <Col span={6}>
                    <Form.Item 
                      name="harga" label="Harga">
                      <Input/>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item 
                      name="nama" label="Nama">
                      <Input/>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item 
                      name="kategori" label="kategori">
                      <Input/>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Button htmlType="submit" type="primary">Submit</Button>

                  </Col>             

                </Row>

              </Form>
            </Card>
        </Row>

        <Row>
          <Col span={18}>
            <Row style={{width: "100%"}} gutter={[16, 16]}> 
              {
              data.length > 0 ? data.map((item, index)=> {
                return (
                  <Col span={6}>
                    <Card title="Buah Guis" bordered={true} style={{ width: "100%" }} onClick={() => {showModal(item)}}> 
                        <div key = {index}>
                        <h2>ID: {item.id}</h2>
                        <h2>Nama: {item.brand}</h2>
                        <h2>Harga: {item.price}</h2>
                        <h2>Stock: {item.stock}</h2>
                        <h2>Kategori: {item.category  }</h2>
                        <Button type='danger' onClick={()=> {filterDelete(item.id)} }> HAPUS</Button>
                        </div> 
                    </Card>
                         
                  </Col>      
                );
                })
                : <Empty />
              }
              <Button onClick={handleMore}>View More</Button>
            </Row>
          </Col>
          <Col span={6}>
            <Card title="Tambah Buah" bordered={true} style={{ width: "100%" }}>
              <Form onFinish={addBuah}>
                <Form.Item 
                  rules={[
                    {
                      required: true,
                      message: "please input namanya",
                    },
                    {
                      type: "string",
                    }
                  ]}
                  name="nama" label="Nama">
                  <Input/>
                </Form.Item>
                <Form.Item 
                rules={[
                  {
                    required: true,
                    message: "please input",
                  },
                  {
                    type: "string",
                  }
                ]}
                name="harga" label="Harga">
                  <Input/>
                </Form.Item>
                <Form.Item 
                rules={[
                  {
                    required: true,
                    message: "please input ",
                  },
                  {
                    type: "string",
                  }
                ]}
                name="stock" label="Stok">
                  <Input/>
                </Form.Item>
                <Form.Item
                rules={[
                  {
                    required: true,
                    message: "please input namanya",
                  },
                  {
                    type: "string",
                  }
                ]}
                name="kategori" label="Kategori">
                  <Input/>
                </Form.Item>
                <Button htmlType="submit" type="primary">Submit</Button>

              </Form>
            </Card>
            
          </Col>
        </Row>

        <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Form onFinish={addBuah} form={formInstance}>
            <Form.Item 
             
              name="id" label="Id">
              <Input/>
            </Form.Item>
            <Form.Item 
              name="nama" label="Nama">
              <Input/>
            </Form.Item>
            <Form.Item 
            name="harga" label="Harga">
              <Input/>
            </Form.Item>
            <Form.Item 
            name="stock" label="Stok">
              <Input/>
            </Form.Item>
            <Form.Item
            name="kategori" label="Kategori">
              <Input/>
            </Form.Item>
            <Button htmlType="submit" type="primary">Submit</Button>

          </Form>
        </Modal>
    </Row>

        
        )
      {/* <div className='row mt-4'>
        <form>
          <input name='nama' type='text' className='form-control' placeholder='nama'/>
          <input name='harga' type='text' className='form-control' placeholder='harga'/>
          <input name='stok' type='text' className='form-control' placeholder='stok'/>
          <input name='kategori' type='text' className='form-control' placeholder='kategori'/>
          <input 
            type='submit' 
            value="submit"
            
            onClick={() => {
              handleAddFruit();
            }}/>
        </form>
      </div> */}
      
      {/* button */}

      {/* <button className='btn btn-primary' onClick={() => {handleIncrement()}}>+</button>
      <button className='btn btn-danger' onClick={() => {handleDecrement()}}>-</button> */}
 
}

export default Content