import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { EscalasDelMedidorMySuffix } from './escalas-del-medidor-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EscalasDelMedidorMySuffix>;

@Injectable()
export class EscalasDelMedidorMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/escalas-del-medidors';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/escalas-del-medidors';

    constructor(private http: HttpClient) { }

    create(escalasDelMedidor: EscalasDelMedidorMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(escalasDelMedidor);
        return this.http.post<EscalasDelMedidorMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(escalasDelMedidor: EscalasDelMedidorMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(escalasDelMedidor);
        return this.http.put<EscalasDelMedidorMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EscalasDelMedidorMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EscalasDelMedidorMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<EscalasDelMedidorMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EscalasDelMedidorMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<EscalasDelMedidorMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<EscalasDelMedidorMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EscalasDelMedidorMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EscalasDelMedidorMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EscalasDelMedidorMySuffix[]>): HttpResponse<EscalasDelMedidorMySuffix[]> {
        const jsonResponse: EscalasDelMedidorMySuffix[] = res.body;
        const body: EscalasDelMedidorMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EscalasDelMedidorMySuffix.
     */
    private convertItemFromServer(escalasDelMedidor: EscalasDelMedidorMySuffix): EscalasDelMedidorMySuffix {
        const copy: EscalasDelMedidorMySuffix = Object.assign({}, escalasDelMedidor);
        return copy;
    }

    /**
     * Convert a EscalasDelMedidorMySuffix to a JSON which can be sent to the server.
     */
    private convert(escalasDelMedidor: EscalasDelMedidorMySuffix): EscalasDelMedidorMySuffix {
        const copy: EscalasDelMedidorMySuffix = Object.assign({}, escalasDelMedidor);
        return copy;
    }
}
