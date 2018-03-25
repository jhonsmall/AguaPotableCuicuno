import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { LecturaMedidorMySuffix } from './lectura-medidor-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LecturaMedidorMySuffix>;

@Injectable()
export class LecturaMedidorMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/lectura-medidors';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/lectura-medidors';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(lecturaMedidor: LecturaMedidorMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(lecturaMedidor);
        return this.http.post<LecturaMedidorMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(lecturaMedidor: LecturaMedidorMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(lecturaMedidor);
        return this.http.put<LecturaMedidorMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LecturaMedidorMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LecturaMedidorMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<LecturaMedidorMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LecturaMedidorMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<LecturaMedidorMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<LecturaMedidorMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LecturaMedidorMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LecturaMedidorMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LecturaMedidorMySuffix[]>): HttpResponse<LecturaMedidorMySuffix[]> {
        const jsonResponse: LecturaMedidorMySuffix[] = res.body;
        const body: LecturaMedidorMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LecturaMedidorMySuffix.
     */
    private convertItemFromServer(lecturaMedidor: LecturaMedidorMySuffix): LecturaMedidorMySuffix {
        const copy: LecturaMedidorMySuffix = Object.assign({}, lecturaMedidor);
        copy.lecturafinal = this.dateUtils
            .convertDateTimeFromServer(lecturaMedidor.lecturafinal);
        copy.fecha = this.dateUtils
            .convertDateTimeFromServer(lecturaMedidor.fecha);
        return copy;
    }

    /**
     * Convert a LecturaMedidorMySuffix to a JSON which can be sent to the server.
     */
    private convert(lecturaMedidor: LecturaMedidorMySuffix): LecturaMedidorMySuffix {
        const copy: LecturaMedidorMySuffix = Object.assign({}, lecturaMedidor);

        copy.lecturafinal = this.dateUtils.toDate(lecturaMedidor.lecturafinal);

        copy.fecha = this.dateUtils.toDate(lecturaMedidor.fecha);
        return copy;
    }
}
