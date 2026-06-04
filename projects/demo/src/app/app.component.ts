import { Component, inject } from '@angular/core';
import { Router, RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { BUILD_INFO } from './build-info';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatTabNav, MatTabLink, MatTabNavPanel } from '@angular/material/tabs';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	imports: [MatToolbar, MatIcon, MatButton, MatTabNav, MatTabLink, RouterLinkActive, RouterLink, MatTabNavPanel, RouterOutlet, DatePipe],
})
export class AppComponent {
	router = inject(Router);

	public links = [
		{ name: 'Directive', url: '/directive-test' },
		{ name: 'Component', url: '/component-test' },
	];
	public activeLink: string = '/directive-test';
	public readonly buildTime = BUILD_INFO.timestamp;
}
