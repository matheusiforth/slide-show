import logoIforth from '../images/logo-iforth.png'
import deca from '../images/deca.svg'
import portinari from '../images/portinari.svg'
import hydra from '../images/hydra.svg'
import duratex from '../images/duratex.svg'
import castelatto from '../images/castelatto.svg'
import ceusa from '../images/ceusa.svg'
import durafloor from '../images/durafloor.svg'

import * as S from './Footer.style'

export function Footer() {
  return (
    <S.Wrapper>
      <div>
        <S.Logos style={{ height: 11, width: 100 }} src={deca} />
        <S.Logos style={{ height: 12.75, width: 100 }} src={portinari} />
        <S.Logos style={{ height: 13, width: 100 }} src={hydra} />
        <S.Logos style={{ height: 12.75, width: 100 }} src={duratex} />
        <S.Logos style={{ height: 12.75, width: 100 }} src={castelatto} />
        <S.Logos style={{ height: 11, width: 100 }} src={ceusa} />
        <S.Logos style={{ height: 12.75, width: 100 }} src={durafloor} />
      </div>

      <S.Image src={logoIforth} />
    </S.Wrapper>
  )
}
