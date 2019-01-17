import { Transfer } from 'antd'

class Tran extends React.Component {
  state = {
    mockData: [],
    targetKeys: [],
  }

  componentDidMount() {
    this.getMock()
  }

  getMock = () => {
    const targetKeys = []
    const mockData = []
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `สวัสดี${i + 1}`,
        description: `สวัสดี${i + 1}`,
        chosen: Math.random() * 2 > 1,
      }
      if (data.chosen) {
        targetKeys.push(data.key)
      }
      mockData.push(data)
    }
    this.setState({ mockData, targetKeys })
  }

  filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1

  handleChange = (targetKeys) => {
    const d = targetKeys.map((item) => this.state.mockData.filter((item2) => item2.key === item))

    const t = d.map((item) => {
      item.score = 0
      return item
    })
    console.log(JSON.stringify(t, null, 2))
    this.setState({ targetKeys })
  }

  handleSearch = (dir, value) => {
    console.log('search:', dir, value)
  }

  render() {
    return (
      <Transfer
        dataSource={this.state.mockData}
        showSearch
        filterOption={this.filterOption}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        onSearch={this.handleSearch}
        render={(item) => item.title}
      />
    )
  }
}

export default Tran
