import React, { Component } from 'react'
import "./style.css"

export default class Footer extends Component {
  render() {
    return (
      <footer className='footer'>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          My
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Forum
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Add businesses
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Feedback
        </a>
        <br />
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Mint web
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Mint web download
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Wedding
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Parenting
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Decoration
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Feasts
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Education
        </a>
        <br />
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Desktop
        </a>
        <em className="footer__seperator">|</em>
        <a className='footer__link' href="https://m.dianping.com/nmy/myinfo">
          Mobile
        </a>
        <em className="footer__seperator">|</em>
        <br />
        <p className="footer__copyright">copyright ©2023 mintstore.com</p>
      </footer>
    )
  }
}
