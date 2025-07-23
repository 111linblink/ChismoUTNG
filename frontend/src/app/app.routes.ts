import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Form } from './components/form/form';
import { Category } from './components/category/category';
import { View } from './components/view/view';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'form', component: Form},
    {path: 'category', component: Category},
    {path: 'view', component: View}
];
