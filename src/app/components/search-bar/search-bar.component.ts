import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
/**
 * SearchBar
 */
export class SearchBarComponent implements OnInit {
  /**
   * Contructor
   */
  constructor(private router: Router) {}
  /**
   * @return {void}
   */
  ngOnInit(): void {}

  /**
   *
   * @param {NgForm} form
   */
  onSubmit(form: NgForm) {
    this.router.navigate(['seach', form.value.seach]);
  }
}
