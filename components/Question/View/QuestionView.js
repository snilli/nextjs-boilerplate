import React from 'react'
import PropTypes from 'prop-types'
import { Card, Radio, Checkbox } from 'antd'

const { Grid } = Card
const { Group: RadioGroup } = Radio
const { Group: CheckboxGroup } = Checkbox

const handleRadio = (choise, answer) => (
  <RadioGroup defaultValue={answer[0]} size="large">
    {choise.map((item, index) => (
      <Radio key={`${index}${item}`} value={item} disabled>
        {item}
      </Radio>
    ))}
  </RadioGroup>
)

const handleCheckbox = (choise, answer) => {
  const option = choise.map((item) => ({
    label: item,
    value: item,
  }))
  return <CheckboxGroup size="large" options={option} disabled defaultValue={answer} />
}

const handleInput = () => {}

const QuestionView = ({ sheetQuestionList }) => (
  <div>
    {sheetQuestionList.map((item, index) => {
      const { type, choise, answer, title } = item
      let anwser = <div />
      switch (type) {
        case 1:
          anwser = handleRadio(choise, answer)
          break
        case 2:
          anwser = handleCheckbox(choise, answer)
          break
        default:
          anwser = <div />
      }

      return (
        <div key={item.id}>
          <Grid
            style={{ width: '100%', fontSize: '18px', overflowX: 'auto', whiteSpace: 'nowrap' }}
          >
            <div style={{ float: 'left' }}>
              {index + 1}. {title}
              <br />
              {anwser}
            </div>
            <div style={{ float: 'right' }}>button</div>
          </Grid>
        </div>
      )
    })}
  </div>
)

QuestionView.propTypes = {
  sheetQuestionList: PropTypes.instanceOf(Array).isRequired,
}

export default QuestionView
