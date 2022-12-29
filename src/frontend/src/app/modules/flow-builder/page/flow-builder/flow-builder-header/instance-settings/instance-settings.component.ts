import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, switchMap, take, tap } from 'rxjs';
import { Collection } from 'src/app/modules/common/model/collection.interface';
import { Instance } from 'src/app/modules/common/model/instance.interface';
import { InstanceService } from 'src/app/modules/common/service/instance.service';
import { TimeHelperService } from 'src/app/modules/common/service/time-helper.service';
import { CollectionActions } from 'src/app/modules/flow-builder/store/action/collection.action';
import { BuilderSelectors } from 'src/app/modules/flow-builder/store/selector/flow-builder.selector';

@Component({
	selector: 'app-instance-settings',
	templateUrl: './instance-settings.component.html',
	styleUrls: ['./instance-settings.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstanceSettingsComponent {
	loading = false;
	collectionInstance$: Observable<Instance | undefined>;
	collection$: Observable<Collection>;
	deleteInstance$: Observable<void>;
	tooltipText = 'No instance deployed';
	dialogRef: MatDialogRef<TemplateRef<any>>;
	constructor(
		private store: Store,
		private instanceService: InstanceService,
		public timeHelperService: TimeHelperService,
		private dialogService: MatDialog
	) {
		this.collectionInstance$ = this.store.select(BuilderSelectors.selectCurrentCollectionInstance).pipe(
			tap(inst => {
				if (!inst) {
					this.tooltipText = 'No instance deployed';
				} else {
					this.tooltipText = 'Instance settings';
				}
			})
		);
		this.collection$ = this.store.select(BuilderSelectors.selectCurrentCollection);
	}

	disableInstance() {
		if (!this.loading) {
			this.loading = true;
			this.deleteInstance$ = this.collectionInstance$.pipe(
				take(1),
				switchMap(instance => {
					return this.instanceService.delete(instance!.id);
				}),
				catchError(err => {
					console.error(err);
					this.loading = false;
					throw err;
				}),
				tap(() => {
					this.loading = false;
					this.dialogRef.close(true);
					this.store.dispatch(CollectionActions.removeInstance());
				})
			);
		}
	}

	openModal(template: TemplateRef<any>) {
		this.deleteInstance$ = of(void 0);
		this.dialogRef = this.dialogService.open(template);
	}
}
